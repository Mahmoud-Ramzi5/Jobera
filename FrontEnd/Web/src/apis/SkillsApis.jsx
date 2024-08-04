import axios from 'axios';

export const FetchSkillTypes = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/skills/types', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const FetchAllSkills = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/skills`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const FetchSkills = async (type) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/skills?type[eq]=${type}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const SearchSkills = async (name) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/skills?name[like]=${name}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};
export const AddNewSkillApI= async(name,type)=>{
    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/skills`,{
            "name":name,"type":type
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;

    }catch (error) {
        return error.response;
    }
}
export const EditSkillAPI= async(name,type,skillId)=>{
    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/skills/${skillId}`,{
            "name":name,"type":type
        }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': "application/json",
            }
        });
        return response;

    }catch (error) {
        return error.response;
    }
}
