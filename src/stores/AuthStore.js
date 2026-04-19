import axios from "axios";
import { defineStore } from "pinia";
export const AuthStore = defineStore('AuthStore', {
    state: () => ({
        registerErr: '',
        v: null,
        result: null,
        loginError: '',
        userinfo: {
            name: '',
            email: '',
            phone: null,
            gender: '',
            avatar: "",
        },
        errorFields: {
            email: false,
            password: false
        },
        registerForm: {
            name: '', 
            email: '',
            password: '',
            password_confirmation: '',
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
        registerOTP: '',
        token: localStorage.getItem('authToken') || '',
    }),
    actions: {        
        async register(){
            try{
                const res = await axios.post('auth/register', this.registerForm);
                return res.data
            }catch(error){
                throw error
            }
        },
        // =============================================
        // Session management
        saveLoginSession(res) {
            if (!res?.result) return false

            const user = res.data.user

            const session = {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                device_fingerprint: user.current_device?.device_fingerprint,
                token: res.data.token
            }

            // save full session
            this.user = session
            this.token = session.token

            // persist (refresh-safe)
            localStorage.setItem('auth_user', JSON.stringify(session))
            localStorage.setItem('auth_token', session.token)

            return true
        },
        loadSession() {
            const user = localStorage.getItem('auth_user')
            const token = localStorage.getItem('auth_token')

            if (user && token) {
                this.user = JSON.parse(user)
                this.token = token

                return true
            }

            return false
        },
        clearSession() {
            this.user = null
            this.token = null

            localStorage.removeItem('auth_user')
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
            localStorage.removeItem('otpStartTime')
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
                const res = await axios.post('auth/login', {
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
                const res = await axios.post('auth/send-forgot-password-pin', {
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
                
                // this.startOtpTimer(email)
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
                this.resetPasswordForm.email = localStorage.getItem('otp_email')
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