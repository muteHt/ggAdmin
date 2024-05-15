//图片数据 来源https://picsum.photos/200/300
//品牌信息数据
function createTradMarkList() {
    return [
        {
            markId: 1,
            markName: 'apple',
            markUrl: 'https://fakeimg.pl/100',
        },
        {
            markId: 2,
            markName: 'apple',
            markUrl: 'https://fakeimg.pl/100',
        },
        {
            markId: 3,
            markName: 'apple',
            markUrl: 'https://fakeimg.pl/100',
        },
        {
            markId: 4,
            markName: 'apple',
            markUrl: 'https://fakeimg.pl/100',
        },
        {
            markId: 1,
            markName: 'apple',
            markUrl: 'https://fakeimg.pl/100',
        },
        {
            markId: 5,
            markName: 'apple',
            markUrl: 'https://fakeimg.pl/100',
        }

    ]
}

export default [
    // 获取品牌信息
    {
        url: '/api/tradMark/getAll',
        method: 'get',
        response: (request) => {
            const result = createTradMarkList()
            //没有返回失败的信息
            if (!result) {
                return { code: 201, data: { message: '获取品牌信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: { result } }
        },
    },
]