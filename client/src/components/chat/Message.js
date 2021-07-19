export default function Message({ message }) {

    return <div
        className={`bg-blue-300 block clear-both mt-3 m-2 p-3 rounded-lg w-3/5 ${message.owner ? 'float-right' : 'float-left'}`}
    >

        <div>{message.body.text}</div>
        <div>{message.body.time}</div>

    </div>
}