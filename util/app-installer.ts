// import RNFS from 'react-native-fs';
// import ApkInstaller from 'react-native-apk-installer';

// const downloadAndInstallApk = async (apkUrl) => {
//     const filePath = `${RNFS.DocumentDirectoryPath}/your-app.apk`;
//     const download = RNFS.downloadFile({
//         fromUrl: apkUrl,
//         toFile: filePath,
//         progress: (res) => {
//             console.log((res.bytesWritten / res.contentLength).toFixed(2));
//         },
//     });

//     const result = await download.promise;
//     if (result.statusCode === 200) {
//         ApkInstaller.install(filePath);
//     } else {
//         console.warn('Download failed');
//     }
// };
