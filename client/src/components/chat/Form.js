export default function MessageForm(){
    return <div className="bottom-0 w-full fixed">
    <form onSubmit={sendMessage}>

        <input
            ref={message}
            className="w-10/12 p-3 mx-3 rounded-lg "
            type="text" />

        <button className=" w-1/12 text-blue-300 px-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>

    </form>
</div>
}