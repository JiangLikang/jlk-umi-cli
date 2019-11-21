import Redirect from 'umi/redirect'
export default function(props) {
    if(Math.random()>0.5) {
        return <Redirect to="/exception/500" /> 
    }
    //登录成功时，显示子路由的页面组件
    return <div>{props.children}</div>
}