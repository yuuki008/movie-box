import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'
import 'firebase/functions'
import 'firebase/storage'
import 'firebase/firestore'
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const FirebaseTimestamp = firebase.firestore.Timestamp