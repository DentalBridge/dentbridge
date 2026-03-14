package com.dentbridge.service;

import com.dentbridge.model.Appointment;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;

@Slf4j
@Service
public class GoogleCalendarService {

    private static final String APPLICATION_NAME = "DentBridge";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Value("${google.calendar.enabled:false}")
    private boolean calendarEnabled;

    @Value("${google.calendar.credentials-path:}")
    private String credentialsPath;

    @Value("${google.calendar.id:primary}")
    private String calendarId;

    private Calendar calendarService;

    private Calendar getCalendarService() throws IOException, GeneralSecurityException {
        if (calendarService == null && calendarEnabled && !credentialsPath.isEmpty()) {
            NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsPath))
                    .createScoped(Collections.singleton("https://www.googleapis.com/auth/calendar"));

            calendarService = new Calendar.Builder(httpTransport, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        }
        return calendarService;
    }

    public String createEvent(Appointment appointment) {
        if (!calendarEnabled) {
            log.info("Google Calendar integration is disabled");
            return null;
        }

        try {
            Calendar service = getCalendarService();
            if (service == null) {
                log.warn("Calendar service not initialized");
                return null;
            }

            Event event = new Event()
                    .setSummary("Appointment: " + appointment.getPatient().getName())
                    .setDescription(buildEventDescription(appointment));

            // Set start time
            DateTime startDateTime = new DateTime(
                    Date.from(appointment.getAppointmentDateTime().atZone(ZoneId.systemDefault()).toInstant())
            );
            EventDateTime start = new EventDateTime()
                    .setDateTime(startDateTime)
                    .setTimeZone(ZoneId.systemDefault().getId());
            event.setStart(start);

            // Set end time
            DateTime endDateTime = new DateTime(
                    Date.from(appointment.getAppointmentDateTime()
                            .plusMinutes(appointment.getDurationMinutes())
                            .atZone(ZoneId.systemDefault()).toInstant())
            );
            EventDateTime end = new EventDateTime()
                    .setDateTime(endDateTime)
                    .setTimeZone(ZoneId.systemDefault().getId());
            event.setEnd(end);

            Event createdEvent = service.events().insert(calendarId, event).execute();
            log.info("Created Google Calendar event: {}", createdEvent.getId());
            return createdEvent.getId();

        } catch (Exception e) {
            log.error("Failed to create Google Calendar event", e);
            return null;
        }
    }

    public void updateEvent(String eventId, Appointment appointment) {
        if (!calendarEnabled || eventId == null) {
            return;
        }

        try {
            Calendar service = getCalendarService();
            if (service == null) {
                return;
            }

            Event event = service.events().get(calendarId, eventId).execute();

            event.setSummary("Appointment: " + appointment.getPatient().getName());
            event.setDescription(buildEventDescription(appointment));

            // Update start time
            DateTime startDateTime = new DateTime(
                    Date.from(appointment.getAppointmentDateTime().atZone(ZoneId.systemDefault()).toInstant())
            );
            EventDateTime start = new EventDateTime()
                    .setDateTime(startDateTime)
                    .setTimeZone(ZoneId.systemDefault().getId());
            event.setStart(start);

            // Update end time
            DateTime endDateTime = new DateTime(
                    Date.from(appointment.getAppointmentDateTime()
                            .plusMinutes(appointment.getDurationMinutes())
                            .atZone(ZoneId.systemDefault()).toInstant())
            );
            EventDateTime end = new EventDateTime()
                    .setDateTime(endDateTime)
                    .setTimeZone(ZoneId.systemDefault().getId());
            event.setEnd(end);

            service.events().update(calendarId, eventId, event).execute();
            log.info("Updated Google Calendar event: {}", eventId);

        } catch (Exception e) {
            log.error("Failed to update Google Calendar event: {}", eventId, e);
        }
    }

    public void deleteEvent(String eventId) {
        if (!calendarEnabled || eventId == null) {
            return;
        }

        try {
            Calendar service = getCalendarService();
            if (service == null) {
                return;
            }

            service.events().delete(calendarId, eventId).execute();
            log.info("Deleted Google Calendar event: {}", eventId);

        } catch (Exception e) {
            log.error("Failed to delete Google Calendar event: {}", eventId, e);
        }
    }

    private String buildEventDescription(Appointment appointment) {
        StringBuilder description = new StringBuilder();
        description.append("Patient: ").append(appointment.getPatient().getName()).append("\n");
        description.append("Status: ").append(appointment.getStatus()).append("\n");

        if (appointment.getTreatmentType() != null) {
            description.append("Treatment: ").append(appointment.getTreatmentType()).append("\n");
        }

        if (appointment.getNotes() != null) {
            description.append("Notes: ").append(appointment.getNotes()).append("\n");
        }

        return description.toString();
    }

}
