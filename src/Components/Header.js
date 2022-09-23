export default function Header(){
    return(
        <div id="Header">
            <span id="logo-container">
                <img src={process.env.PUBLIC_URL+'/images/logo.svg'} alt="logo"></img>
            </span>
        </div>
    )
}