const BASE_URL = `${import.meta.env.VITE_BACKEND}/tracks`;

export const index = async () =>{
    try{
        const res = await fetch(BASE_URL)
        return res.json()
    }catch (err) {
        console.log(err)
    }
};

export const show = async (trackId) => {
    try{
        const res = await fetch (`${BASE_URL}/${trackId}`)
        return res.json()
    }catch (err){
        console.log(err)
    }    
};

export const create = async (trackFormData) => {
    try{
        const res = await fetch(BASE_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(trackFormData)
        })
        return res.json()
    }catch(err){
        console.log(err)
    }
}

export const update = async (trackId, trackFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${trackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackFormData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (trackId, trackFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${trackId}`, {
            method: 'DELETE',
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};