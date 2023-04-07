let usuario

const listUsers = [
    {
        username: 'jhosep',
        password: '111'
    },
    {
        username: 'trejo',
        password: '111'
    },
    {
        username: 'gerson',
        password: '111'
    },
    {
        username: 'nicolle',
        password: '111'
    },
    {
        username: 'matias',
        password: '111'
    },
    {
        username: 'mijael',
        password: '111'
    }
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