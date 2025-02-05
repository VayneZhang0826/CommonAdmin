const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'guest' },
    { id: 4, name: 'David', email: 'david@example.com', role: 'admin' },
    { id: 5, name: 'Eve', email: 'eve@example.com', role: 'user' },
    { id: 6, name: 'Frank', email: 'frank@example.com', role: 'guest' }
];

/**
 * 用户列表
 * @field title: 标题
 * @field dataIndex: 数据字段
 * @field queryObject: 查询字段对象
 * @field queryObject.type: 查询字段渲染组件类型
 * @field queryObject.[...rest]: 查询字段渲染组件props
 */

const userColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        queryObject: { type: 'input', placeholder: 'ID' }
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        queryObject: { type: 'input', placeholder: '姓名' }
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        queryObject: {
            type: 'select', placeholder: '角色', options: [
                { label: '管理员', value: 'admin' },
                { label: '用户', value: 'user' },
                { label: '访客', value: 'guest' }
            ]
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        customRender: ({ text, record }) => {
            return <a href="#">删除</a>
        }
    }
]

export { users, userColumns };