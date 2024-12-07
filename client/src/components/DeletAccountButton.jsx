


const DeletAccountButton = ({ currentUser }) => {
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await fetch(`/api/user/delete/${currentUser._id}`)
        } catch (error) {

        }
    }
    return (
        <form onSubmit={handleDelete}>
            <button className='bg-red-600 p-3 text-white hover:opacity-95'>Delete Account</button>
        </form>
    )
}

export default DeletAccountButton