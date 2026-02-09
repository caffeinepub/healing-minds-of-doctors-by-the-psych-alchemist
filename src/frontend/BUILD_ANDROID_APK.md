# Building Android APK for Healing Minds

This guide explains how to build a debug APK of the Healing Minds application for Android devices.

## In-App APK Download

**For testers:** You can find the APK download link directly in the app:
1. Log in to the Healing Minds web app
2. Navigate to **Settings** from the sidebar menu
3. Look for the **Android App (Debug APK)** section
4. If an APK URL is available, click "Download APK" for one-click installation
5. If no URL is available, follow the manual build steps below

**Note:** The downloaded APK is a **debug build** for testing purposes. You may need to enable "Install from Unknown Sources" in your Android device settings to install it.

## Prerequisites

Before building the APK, ensure you have the following installed:

### Required Software

1. **Node.js & pnpm**
   - Node.js 18+ (check with `node --version`)
   - pnpm package manager (check with `pnpm --version`)

2. **Java Development Kit (JDK)**
   - JDK 17 or higher
   - Set `JAVA_HOME` environment variable
   - Verify: `java -version` should show version 17+

3. **Android Studio & Android SDK**
   - Download from: https://developer.android.com/studio
   - Install Android SDK Platform 34 (Android 14)
   - Install Android SDK Build-Tools 34.0.0+
   - Install Android SDK Command-line Tools
   - Set `ANDROID_HOME` environment variable to SDK location
   - Add `$ANDROID_HOME/platform-tools` to PATH

4. **Capacitor CLI** (REQUIRED - currently missing from package.json)
   ```bash
   # This needs to be added to package.json dependencies:
   # "@capacitor/cli": "^6.0.0"
   # "@capacitor/core": "^6.0.0"
   # "@capacitor/android": "^6.0.0"
   ```

### Environment Variables Setup

**macOS/Linux:**
