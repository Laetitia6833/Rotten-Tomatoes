
export default function ({ app, redirect }) {
    const cookieRes = app.$cookies.get('user')
    if (!cookieRes || !cookieRes.admin) {
        redirect('/')
    }
}
