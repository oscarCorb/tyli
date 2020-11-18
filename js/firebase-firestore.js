
// // getting data
// db.collection('object-of-tracks').get()
//     .then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             // OJO, en el vídeo aquí llama a una función que crea más arriba
//             console.log(doc.data());
//         });
//     });

// // saving data
// export const saveDataDB = () => {
//     db.collection('tracks-test').add({
//         // iba por aquí (recuerda q ya no usamos local storage)
//         title:       form.title.value,
//         genre:       form.genre.value,
//         software:    form.software.value,
//         hardware:    form.hardware.value,
//         inspiration: form.inspiration.value,
//     });
// }
