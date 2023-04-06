import Loading_img from "../asset/loading.gif";
const Loading_save = ({ text }) => {
    return <>
        <span> <img style={{ width: "50px" }} src={Loading_img} /> {text}...</span>
    </>
}
export default Loading_save;