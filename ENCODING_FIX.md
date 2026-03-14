# Encoding Issue Fix Guide

## Problem
You're seeing "file was loaded in wrong encoding" error when opening Java model classes in your IDE.

## Quick Fix for IntelliJ IDEA

### Option 1: Change IDE Settings (Recommended)
1. Open IntelliJ IDEA
2. Go to **File** → **Settings** (Windows/Linux) or **IntelliJ IDEA** → **Preferences** (Mac)
3. Navigate to **Editor** → **File Encodings**
4. Set the following:
   - **Global Encoding**: UTF-8
   - **Project Encoding**: UTF-8
   - **Default encoding for properties files**: UTF-8
   - **Transparent native-to-ascii conversion**: ✓ (checked)
5. Click **Apply** → **OK**
6. Close and reopen the project

### Option 2: Fix Individual Files
If only model classes are affected:
1. Right-click on the `src/main/java/com/dentbridge/model` folder
2. Select **File Encoding** → **UTF-8**
3. When prompted, choose **Reload** (not Convert)

### Option 3: Reload All Files
1. Close IntelliJ IDEA completely
2. Delete `.idea` folder from project directory (it will be regenerated)
3. Open project again in IntelliJ
4. When prompted about encoding, select **UTF-8**

## Quick Fix for VS Code

1. Open VS Code
2. Open Command Palette: **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows/Linux)
3. Type: "Change File Encoding"
4. Select **Reopen with Encoding** → **UTF-8**
5. For all files, add to `.vscode/settings.json`:
```json
{
  "files.encoding": "utf8",
  "java.jdt.ls.vmargs": "-Dfile.encoding=UTF-8"
}
```

## Quick Fix for Eclipse

1. Right-click on project → **Properties**
2. Go to **Resource** section
3. Change **Text file encoding** to **UTF-8**
4. Click **Apply** → **OK**
5. Clean and rebuild project

## Verify the Fix

After applying the fix, your model classes should show proper code like:
```java
@Entity
@Table(name = "patients")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // ... etc
}
```

NOT decompiled code with random variables like:
```java
public class Patient {
    private Long var1;
    private String var2;
    // ... etc
}
```

## Still Having Issues?

### Check if you opened `.class` files instead of `.java` files

If you see method bodies that look weird, you might be viewing compiled `.class` files:
1. Make sure you're in `src/main/java/com/dentbridge/model/`
2. NOT in `target/classes/com/dentbridge/model/`

### Re-extract the project

Use the new export file: `DentBridge-UTF8-[date].tar.gz`

```bash
# Extract on new laptop
cd ~/Documents
tar -xzf DentBridge-UTF8-20260301-1655.tar.gz
cd DentBridge

# Verify encoding
file -I src/main/java/com/dentbridge/model/*.java
# Should show: charset=us-ascii or charset=utf-8
```

## Prevention for Future

The project now includes:
- ✅ `.editorconfig` - Universal encoding standard
- ✅ `.idea/encodings.xml` - IntelliJ encoding config
- ✅ `pom.xml` - Maven UTF-8 encoding
- ✅ Clean export without compiled classes

## System-Wide Fix (macOS/Linux)

Add to your `~/.zshrc` or `~/.bashrc`:
```bash
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
```

Then reload:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

## System-Wide Fix (Windows)

1. Search for "Environment Variables" in Windows
2. Add new System Variable:
   - Name: `JAVA_TOOL_OPTIONS`
   - Value: `-Dfile.encoding=UTF-8`
3. Restart your IDE

---

## Summary

**Most Common Solution:**
1. IntelliJ: Settings → Editor → File Encodings → Set all to UTF-8
2. Reload project
3. Done!

If that doesn't work, use the fresh export: `DentBridge-UTF8-[date].tar.gz` from your Desktop.
