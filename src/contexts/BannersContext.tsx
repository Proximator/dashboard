import axios from 'axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface Banner { brandId:number, bussnessId:number, expireAt: Date, id?: number, imageURL: string, status: boolean, link:string, targetGender: string}

interface BannersContextType {
    banners: Banner[];
    createBanner: (banner: Banner) => Promise<void>;
}

export const BannersContext = createContext<BannersContextType>({
    banners: [],
    createBanner: (banner: Banner) => new Promise((res) => res()),
}as BannersContextType);

const createData = (brandId:number, bussnessId:number, expireAt: any, id?: number, imageURL: string, status: boolean, link:string, targetGender: string): Banner => {
    return { brandId, bussnessId, expireAt, id, imageURL, status, link, targetGender};
}

const rowsInitial = [
    createData(1, 1, '07/12/2021', 1, 'https://firebasestorage.googleapis.com', true,"www.ahlancard.ma","all"),
];

export const BannersProvider = ({ children } : { children: ReactNode }): JSX.Element => {
    console.log("into the provider")
    const [banners, setBanners] = useState<Banner[]>(rowsInitial);
    const [addreward, setAddReward] = useState<Banner>();
    const [businessId,setBusinessId] = useState(1);
    useEffect(() => {
        console.log("banners contex")
        axios.get(`http://75.119.140.14:8081/api/v1/marketing/banners?businessId=${businessId}`)
        .then((res)=>{
            console.log(res.data);
            let responseData:any = res.data;
            responseData.map((a: { brandId:number, bussnessId:number, expireAt: any, id?: number, imageURL: string, status: boolean, link:string, targetGender: string })=>{
                let data:Banner = createData(a.brandId, a.bussnessId, a.expireAt, a.id, a.imageURL, a.status, a.link, a.targetGender);
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