//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '123456',
            desc: '超级管理员',
            roles: ['超级管理员'],
            buttons: ['cuser.detail'],
            routes: ['acl', 'manu', 'spu', 'sku', 'role', 'product', 'attr', 'trademark', 'user'],
            token: "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSkzJzcxT0lFKrShQsjI0MzQzMTK1NDGvBQApMebnIAAAAA.UG2Qj7F7ASMLBugNG67-wKs0Un6ORrneMkSdio0rKhX0o-fd6BC24T1gCzfVVtsNERPzs4Sjwz8JOyPfLazUSA",
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '123456',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['spu', 'sku', 'trademark', 'product', 'attr'],
            token: "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSkzJzcxT0lFKrShQsjI0MzQzMTK1NDGvBQApMebnIAAAAA.UG2Qj7F7ASMLBugNG67-wKs0Un6ORrneMkSdio0rKhX0o-fd6BC24T1gCzfVVtsNERPzs4Sjwz8JOyPfLazUSA",

        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码

            const { username, pass } = body;
            //调用获取用户信息函数,用于判断是否有此用户

            const checkUser = createUserList().find(
                (item) => { return item.username === username && item.password === pass },
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: "账号或密码不正确" } }
            }
            //如果有返回成功信息

            const { token, avatar, userId } = checkUser
            const tempName = checkUser.username;

            return { code: 200, data: { token, tempName, userId, avatar } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            // const token = request.headers.token;
            const userId = request.query.userId;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.userId == userId)
            // const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: { checkUser } }
        },
    }
]
