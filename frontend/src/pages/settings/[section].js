import { useRouter } from 'next/router'
import AcountSettings from '../../components/settingSectoins/account';
import SecuritySettings from '../../components/settingSectoins/security';
import SettingsDrawer from '../../components/settingSectoins/Drawer';
import Grid from '@mui/material/Grid';



const GetSection = (section) => {
    switch(section) {
        case "account" :
            return <AcountSettings/>
        case "security":
            return <SecuritySettings/>
        };
    };




const Settings = () => { 

    const router = useRouter()
    const section = router.query.section

    return (
        <Grid container spacing={2} columns={16}>
            <Grid item xs={4}>
                <SettingsDrawer/>   
            </Grid>
            <Grid item xs={8}>
                {GetSection(section)}
            </Grid>
        </Grid>
    );
};

export default Settings;