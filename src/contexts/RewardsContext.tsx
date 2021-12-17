import axios from 'axios';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import { Reward, Gender } from "../types";


interface RewardsContextType {
    rewards: Reward[];
    createReward: (reward: Reward) => Promise<void>;
    deleteRewards: (ids: number[]) => Promise<void>
}

export const RewardsContext = createContext<RewardsContextType>({
    rewards: [],
    createReward: (reward: Reward) => new Promise((res) => res()),
    deleteRewards: (ids: number[]) => new Promise((res) => res())
} as RewardsContextType);

const createData = (date: string, id: number, points: number, description: string, expirationDate: string, discount: number, gender: Gender, status: boolean): Reward => {
    return { date, id, points, description, expirationDate, discount, gender, status };
}

const rowsInitial = [
    createData('07.10.2020', 1, 23, 'reward 1', '07/12/2021', 20, 'all', true),
    createData('07.10.2020', 2, 50, 'reward 2', '07/12/2021', 20, 'female', false),
    createData('07.10.2020', 3, 23, 'reward 1', '07/12/2021', 20, 'all', true),
    createData('07.10.2020', 4, 50, 'reward 2', '07/12/2021', 20, 'female', false)
];

export const RewardsProvider = ({ children } : { children: ReactNode }): JSX.Element => {
    const [rewards, setRewards] = useState<Reward[]>(rowsInitial);
    const [addreward, setAddReward] = useState<Reward>();
    const [businessId,setBusinessId] = useState(1);
    useEffect(() => {
        axios.get(`http://75.119.140.14:8081/api/v1/loyalty/rewards?businessId=${businessId}`)
        .then((res)=>{
            console.log(res.data);
            let responseData:any = res.data;
            responseData.map((a: { expireDate: any; id: any; points: any; description: any; expiredate: any; discount: any; targetGender: any; isActive: any; })=>{
                let data:Reward = createData(a.expireDate,a.id,a.points,a.description,a.expiredate,a.discount,a.targetGender,a.isActive);
                console.log(a)
                setRewards(rewards=>[...rewards,data])
            })
            
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }, []);

    const createReward = (reward: Reward): Promise<void> => {
        //console.log({reward});
        return new Promise((res) => {
            try{
                // setTimeout(() => {
                //     setAddReward(reward);
                //     console.log('done from RewardsContext')
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

    const deleteRewards = (ids: number[]): Promise<void> => {
        const newRewards = rewards.filter(e => e.id && !ids.includes(e.id));
        return new Promise((res) => {
            setTimeout(() => {
                setRewards([...newRewards]);
                console.log('done from function')
                res();
            }, 300);
        })
    }   

    return <RewardsContext.Provider value={{ rewards, createReward, deleteRewards }}>{children}</RewardsContext.Provider>;
};

export const useRewards = (): RewardsContextType =>
    useContext(RewardsContext) as RewardsContextType;
