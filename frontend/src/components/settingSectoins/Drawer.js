import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShieldIcon from '@mui/icons-material/Shield';
import { useRouter } from 'next/router';

export default function SelectedListItem() {
  const [selectedSection, setSelectedSection] = React.useState("account");


  const router = useRouter();

  const handleListItemClick = (event, section) => {
    setSelectedSection(section);
    router.push(`/settings/${section}`);
    console.log(event.target);

  };

  return (
    <Box sx={{ width: '100%', hight: 360, maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedSection === "account"}
          onClick={(event) => handleListItemClick(event, "account")}
        >
          <ListItemIcon>
            <PersonOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItemButton>
        <ListItemButton
          selected={selectedSection === "security"}
          onClick={(event) => handleListItemClick(event, "security")}
        >
          <ListItemIcon>
            <ShieldIcon />
          </ListItemIcon>
          <ListItemText primary="Security" />
        </ListItemButton>
      </List>
    </Box>
  );
}