import React,{useEffect, useState} from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { endpoint } from '../schemas/endpoint.js'
import { Box, Typography } from '@mui/material';

const Weather = () => {
    const navigate = useNavigate();
    const [temperature, setTemperature] = useState('');
    const [Humidity, setHumidity] = useState('');
    const [Wind, setWind] = useState('');
    const [Region, setRegion] = useState('');
    const [Condition, setCondition] = useState('');
    const [Capital, setCapital] = useState('');

    useEffect(() => {
        // Fetch data here
        fetch(`${endpoint}/api/v1/get_weather`, {
            methode:'GET'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setTemperature(data.temperature);
            setHumidity(data.humidity);
            setWind(data.wind_speed);
            setWind(data.wind_speed);
            setRegion(data.regionName);
            setCondition(data.condition);
            setCapital(data.capital);
          })
          .catch(error => {
            // Handle error
            console.error(error);
          });
      }, []);
  return (
    <section id='weather'>
            <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '1px',
        borderRadius: '8px',
        width: '600px',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Weather Widget
              </Typography>
              <hr style={{ width: "70%", margin: 'auto'}}></hr>
      <Typography variant="body1">
                  Temperature:<sapn> {temperature}°C</sapn>
      </Typography>
      <Typography variant="body1">
                  Humidity: <sapn> {Humidity}</sapn>
      </Typography>
      <Typography variant="body1">
                  Wind Speed: <sapn> {Wind} km/h</sapn> 
      </Typography>
      <Typography variant="body1">
        Region: <sapn> {Region}</sapn> 
      </Typography>
      <Typography variant="body1">
        Condition: <sapn> {Condition}</sapn> 
      </Typography>
      <Typography variant="body1">
        Capital: <sapn> {Capital}</sapn> 
      </Typography>
    </Box>
    </section>
  );
};

export default Weather;