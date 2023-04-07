let usuario

const listUsers = [
    {
        username: 'jhosep',
        password: '123'
    },
    {
        username: 'trejo',
        password: '321'
    },
    {
        username: 'gerson',
        password: '111'
    },
]

const onLoadLogin = () => {

    usuario = localStorage.getItem('usuario')

    console.log({ usuario });

    if (usuario) {
        window.location.href = '/'
    }

}

const login = () => {

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const isUser =
        listUsers.find(user => user.username === username && user.password === password)

    if (!isUser) {
        console.log('no es correcto p crrano');
        return
    }

    localStorage.setItem('usuario', JSON.stringify({ username, password }))

    window.location.href = '/'


}