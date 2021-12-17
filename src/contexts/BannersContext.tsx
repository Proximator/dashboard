import axios from 'axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface Banner { creationDate: Date, id?: number, name?: string, expirationDate: string, gender: string, status: boolean }

interface BannersContextType {
    banners: Banner[];
    createBanner: (banner: Banner) => Promise<void>;
}

export const BannersContext = createContext<BannersContextType>(null as unknown as BannersContextType);

const createData = (creationDate: any, id?: number, name?: string, expirationDate: any, gender: string, status: boolean): Banner => {
    return { creationDate, id, expirationDate, gender, status };
}

const rowsInitial = [
    createData('07.10.2020', 1, 'mahmud', '07/12/2021', 'all', true),
];

export const BannersProvider = ({ children } : { children: ReactNode }): JSX.Element => {
    console.log("into the provider")
    const [banners, setBanners] = useState<Banner[]>([]);
    const [addreward, setAddReward] = useState<Banner>();
    const [businessId,setBusinessId] = useState(1);
    useEffect(() => {
        console.log("banners contex")
        axios.get(`http://75.119.140.14:8081/api/v1/marketing/banners?businessId=${businessId}`)
        .then((res)=>{
            console.log(res.data);
            let responseData:any = res.data;
            responseData.map((a: { creationDate: any, id?: number, name?: string, expirationDate: any, gender: string, status: boolean })=>{
                let data:Banner = createData(a.creationDate, a.id, a.name, a.expirationDate, a.gender, a.status);
                console.log(a)
                setBanners(banner=>[...banner,data])
            })
            
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }, []);

    const createBanner = (reward: Banner): Promise<void> => {
        //console.log({reward});
        return new Promise((res) => {
            try{
                // setTimeout(() => {
                //     setAddReward(reward);
                //     console.log('done from bannerContext')
                //     res();
                // }, 3000);
                axios.post('http://75.119.140.14:8081/api/v1/loyalty/rewards',{
                    //reward
                    "brandId": 0,
                    "businessId": 0,
                    "description": "string",
                    "discount": 0,
                    "expireDate": "2021-12-07T13:05:40.236Z",
                    "id": 0,
                    "isActive": true,
                    "isEngineering": true,
                    "points": 0,
                    "targetGender": "ALL",
                    "bussiness":"slkdf"
                })
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message));
            }catch(error){
                console.log(error,"error");
            }
        })
    } 
    return <BannersContext.Provider value={{ banners, createBanner }}>{children}</BannersContext.Provider>;
};

export const useBanners = (): BannersContextType =>
    useContext(BannersContext) as BannersContextType;