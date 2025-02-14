interface RefreshButtonProps {
    onClick: () => void;
}

function RefreshButton({onClick}: RefreshButtonProps) {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={onClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Refresh
            </button>
        </div>
    );
}

export default RefreshButton;