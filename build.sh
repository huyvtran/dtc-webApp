ionic cordova build android --release --prod && \
rm -f ./build/dtc-unsigned.apk ./build/dtc.apk && \
/Users/Eric/Library/Android/sdk/build-tools/27.0.1/zipalign \
  -v 4 \
  ./platforms/android/build/outputs/apk/android-release-unsigned.apk \
  ./build/dtc-unsigned.apk && \
jarsigner \
  -verbose \
  -sigalg SHA1withRSA \
  -digestalg SHA1 \
  -keystore ./build/key.keystore \
  -storepass Np2Ya9Ha \
  -signedjar ./build/dtc.apk ./build/dtc-unsigned.apk \
  oc_dtc_cert && \
rm -f ./build/dtc-unsigned.apk