export default function(props) {
  console.log(props)
  return(
  <div> 动态路由: 您现在的路由在 {props.location.pathname} ;路由携带参数为 {JSON.stringify(props.location.query)}</div>
  )
}