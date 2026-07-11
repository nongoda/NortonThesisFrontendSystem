import axios from "axios";
import { defineStore } from "pinia";
export const AuthStore = defineStore('AuthStore', {
    state: () => ({
        user: null,
        token: localStorage.getItem('auth_token') || '',
        isReady: false,
        v: null,
        result: null,
        loginError: '',
        userinfo: {
            name: '',
            email: '',
            phone: null,
            gender: '',
            avatar: "",
            token: '',
            device_fingerprint: ''
        },
        errorFields: {
            email: false,
            password: false
        },
        loginForm: {
            email: '',
            password: ''
        },
        loginOTPForm:{
            email: '', 
            password: ''
        },
        emailForgotpassword: {
            email: '',
        },
        otpTime: {
            email: '',
            startAt: 0,
            expiresAt: 0,
            resendAt: 0
        },
        resendOTP:{
            email: ''
        },
        verifyOTP: {
            otp: ''
        },
        resetPasswordForm:{
            email: '',
            password: '',
            password_confirmation: '',
            reset_token: ''
        },
        loginOTP: '',
    }),
    actions: {
        // =============================================
        // Session management
        saveLoginSession(res) {
            if (!res?.result) return false

            const user = res.data.user

            this.token = res.data.token

            localStorage.setItem('auth_token', this.token)

            return true
        },
        async fetchUser() {
            try {
                const res = await axios.get('/user', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })

                this.user = res.data.data
                
                return true

            } catch (error) {
                this.clearSession()
                return false
            }
        },
        async getCurrentUser() {
            if (!this.token) return null

            if (!this.user) {
                const ok = await this.fetchUser()
                if (!ok) return null
            }

            return this.user
        },
        async loadSession() {
            const token = localStorage.getItem('auth_token')

            if (!token) return false

            this.token = token

            const ok = await this.fetchUser()
            this.isReady = true

            return ok
        },
        clearSession() {
            this.user = null
            this.token = null

            localStorage.removeItem('auth_token')
        },
        // =============================================
        //OTP time management
        startOtpTimer(email, expiresAtFromServer = null) {
            const now = Date.now()

            // fallback if backend does NOT send expires_at
            const expiresAt = expiresAtFromServer
                ? new Date(expiresAtFromServer).getTime()
                : now + 5 * 60 * 1000

            const startAt = now
            const resendAt = now + 60 * 1000

            const otpData = {
                email,
                startAt,
                expiresAt,
                resendAt,
            }

            this.otpTime = otpData

            localStorage.setItem('otpEmail', email)
            localStorage.setItem('otpStartTime', startAt)
            localStorage.setItem('otpExpiresAt', expiresAt)
            localStorage.setItem('otpResendAt', resendAt)
        },
        loadOtpTimer() {
            const startAt = Number(localStorage.getItem('otpStartTime'))
            const expiresAt = Number(localStorage.getItem('otpExpiresAt'))
            const resendAt = Number(localStorage.getItem('otpResendAt'))
            const email = localStorage.getItem('otpEmail')

            if (!startAt || !expiresAt || Date.now() > expiresAt) {
                this.clearOtpTimer()
                return false
            }

            this.otpTime = {
                email,
                startAt,
                expiresAt,
                resendAt
            }

            return true
        },
        clearOtpTimer() {
            localStorage.removeItem('otpEmail')
            localStorage.removeItem('otp_email')
            localStorage.removeItem('otpStartTime')
            localStorage.removeItem('reset_token')
            localStorage.removeItem('otpExpiresAt')
            localStorage.removeItem('otpResendAt')
            localStorage.removeItem('loginVerifyProcess')
            localStorage.removeItem('verify_token')
            localStorage.removeItem('forgotPasswordProcess')
            localStorage.removeItem('otp_issued')

            this.otpTime = {
                email: '',
                startAt: 0,
                expiresAt: 0,
                resendAt: 0,
            }
        },
        getRemainingOtpSeconds() {
            return Math.max(
                Math.floor((this.otpTime.expiresAt - Date.now()) / 1000),
                0
            )
        },
        getRemainingResendSeconds() {
            return Math.max(
                Math.floor((this.otpTime.resendAt - Date.now()) / 1000),
                0
            )
        },
        // =============================================
        async login(email, password){
            try{
                const res = await axios.post('auth/logins', {
                    email,
                    password,
                })

                return res.data;
            }catch (error) {
                
            }
        }, 
        // =============================================

        async sendAccessPin(email, purpose = 'email_verification', verify_token) {
            try {
                const res = await axios.post('auth/send-verification-pin', {
                    email,
                    purpose,
                    verify_token
                })

                this.startOtpTimer(email, res.data.data.expires_at)

                return res.data
            } catch (error) {
                // console.error(error.response?.data || error.message)
                // throw error
            }
        },  
        async verifyAccessPin({email, pin, device, verify_token}) {
            try {
                const res = await axios.post('auth/verify-verification-pin',{
                        email,
                        pin,
                        device,
                        verify_token
                    });

                return res.data;
            } catch (error) {

            }
        },
        // ---------------------------------------------------
        async forgotPasswordSendPin(){
            try{
                const res = await axios.post('auth/send-forgots-password-pin', {
                    email: this.emailForgotpassword.email
                })

                if (res.data.result) {
                    this.startOtpTimer(
                        this.emailForgotpassword.email,
                        res.data.data?.expires_at
                    )
                    localStorage.setItem('otp_issued', 'true')
                }
                
                return res.data;
            }catch (error) {
                
            }
        },
        async forgotPasswordResendOTP(email){
            try{
                const res = await axios.post('auth/send-forgot-password-pin', {
                    email: email
                })
                
                if (res.data.result) {
                    this.startOtpTimer(email, res.data.data?.expires_at)
                }
                
                return res.data;
            }catch (error) {
            }
        },
        async forgotPasswordVerifyOTP(email, pin){
            try{
                const res = await axios.post('auth/verify-forgotPassword-pin', {
                    email: email,
                    pin: pin
                })

                return res.data;
            }catch (error) {
                console.error(
                    'Backend validation error:',
                    error.response?.data || error.message
                )
                throw error
            }
        },
        async forgotPasswordResetPassword(){
            try{
                this.resetPasswordForm.email = localStorage.getItem('otpEmail')
                this.resetPasswordForm.reset_token = localStorage.getItem('reset_token')
                const res = await axios.put(
                    'auth/reset-password',
                    this.resetPasswordForm
                )
                return res.data
            }catch (error) {
            }
        }

    }
})