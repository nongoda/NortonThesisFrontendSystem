// import axios from "axios";
// import { defineStore } from "pinia";
// export const SettingStore = defineStore('SettingStore', {
//     state: () => ({
//         profileForm: {
//             name: '',
//             gender: '',
//             email: '',
//             phone: ''
//         },
//         resetPassword:{
//             current_password: '',
//             new_password: '',
//             new_password_confirmation: ''
//         },
//         v: null
//     }),
//     actions:{
//         async updatePassword(token, formData) {
//             const res = await axios.put(
//                 '/user/reset-password',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 }
//             )
//             return res.data
//         },
//         async updateAvatar(token, formData) {
//             const res = await axios.post(
//                 '/user/avatar',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             )
//             return res.data
//         },
//         async removeAvatar(token) {
//             const res = await axios.put(
//                 '/user/delete-avatar',
//                 {}, // empty body
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 }
//             )

//             return res.data
//         },
//         async updateProfile(token, data) {
//             const res = await axios.put(
//                 '/user/updates',
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             )
//             return res.data
//         }

//     }
// });

import axios from 'axios'
import { defineStore } from 'pinia'
export const SettingStore = defineStore('SettingStore', {
  state: () => ({
    profileForm: {
      name: '',
      gender: '',
      email: '',
      phone: '',
    },
    resetPassword: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
    v: null,
  }),
  actions: {
    async updatePassword(token, formData) {
      const res = await axios.put('/user/reset-password', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
    async updateAvatar(token, formData) {
      const res = await axios.post('/user/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
    async removeAvatar(token) {
      const res = await axios.put(
        '/user/delete-avatar',
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return res.data
    },
    async updateProfile(token, data) {
      const res = await axios.put('/user/updates', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
    async sendChangePasswordOtp(token) {
      const res = await axios.post(
        '/change-password/send-otp',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log('sendChangePasswordOtp response:', res.data)
      return res.data
    },
    async getDevices(token, deviceFingerprint) {
      const res = await axios.get('/devices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          device: deviceFingerprint,
        },
      })

      return res.data
    },

    async revokeDevice(token, id) {
      const res = await axios.delete(`/devices/by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.data
    },
    async revokeAllDevices(token) {
      const res = await axios.delete('/devices/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return res.data
    },
  },
})
