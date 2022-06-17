// import { initializeApp } from "firebase/app"
// import { getStorage, ref, uploadBytes } from "firebase/storage"
// import { v4 as uuid } from 'uuid'

// const firebaseConfig = {
//     apiKey: "AIzaSyCbSM4UMCGsD8GXNXeILt7klsynM5bPPCo",
//     authDomain: "automated-recruitment-platform.firebaseapp.com",
//     projectId: "automated-recruitment-platform",
//     storageBucket: "automated-recruitment-platform.appspot.com",
//     messagingSenderId: "99638469572",
//     appId: "1:99638469572:web:ef6c2cc6dd9153dd60ba91"
// }

// const firebaseApp = initializeApp( firebaseConfig )

// const storage = getStorage( firebaseApp )

// const resumeStorageRef = () => ref( storage, `resumes/${ uuid() }.pdf` )

// export const uploadResume = async ( file ) => {
//     try {
//         console.log( storage )
//         const result = await uploadBytes( resumeStorageRef(), file )
//         console.log( result )
//         return {
//             status: true
//         }
//     }
//     catch ( error ) {
//         console.error( error )
//         return {
//             status: false
//         }
//     }
// }