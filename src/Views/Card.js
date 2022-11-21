
export const Card = ({title, imageUrl,description}) => {
    return (
        <>
        <div class="w-full rounded overflow-hidden shadow-lg m-2">
            <img class="w-full h-64 object-center" src={imageUrl} />
            <div class="px-6 py-4">
                <div class="font-regular text-xl mb-2"><span style={{fontWeight:"600"}}>{title}</span></div>
            </div>
            <div class="px-6 py-4">
                <div class="font-regular text-xl mb-2">{description}</div>
            </div>
            
        </div>
        
        </>
    );
}