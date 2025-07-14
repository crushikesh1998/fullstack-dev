export default function UserPage({params} : {params: {id: string}}) {
    return (
        <div className="flex justify-center items-center min-h-screen flex-col w-full">
            <h1>This is profile page </h1>
            <h1>for the {params.id}</h1>
        </div>
    )
}