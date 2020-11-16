import {useEffect, useState} from 'react';
import {Checkbox, Container, FormGroup, FormControlLabel, List, Button} from '@material-ui/core';
import SortByAlpha from '@material-ui/icons/SortByAlpha'
import Shuffle from '@material-ui/icons/Shuffle'
import {isMobileOnly, isTablet} from 'react-device-detect';

import './App.css';

import api from './api/moonPay/moonPayApi';

import {connect} from 'react-redux';
import {getData} from './actions/data';
import Items from './components/Items'

import _ from 'lodash';


function App(props) {
  const {get_data, dataReducer:{data}} = props;
  useEffect(()=>{
    get_data();
  },[get_data]);


  const [checkedState, setCheckedState]=useState({
    checkedA: true,
    checkedB: true,
    sortBy:'shuffle',
  });

  const handleChange = event=>{
    setCheckedState({ ...checkedState, [event.target.name]: event.target.checked })
  };

  const handleClick = (button) =>{
    setCheckedState({ ...checkedState, sortBy: button })
  }
  const renderItems = () => {
    const {checkedA, checkedB, sortBy} =checkedState;
    let dataToRender = [];

    if(checkedA && checkedB) {
      dataToRender=_.sortBy(_.filter(data,{type: 'crypto'}),[sortBy])
    }else if(!checkedA && checkedB){
      dataToRender=_.sortBy(_.filter(data,{isSupportedInUS:true}),[sortBy])
    }else if(checkedA && !checkedB){
      dataToRender=_.sortBy(_.filter(data,{supportsTestMode:true}),[sortBy])
    }else if(!checkedA && !checkedB){
      dataToRender=_.sortBy(_.filter(data,{supportsTestMode:true, isSupportedInUS:true}),[sortBy])
    }
    if(sortBy==='shuffle'){
      return <Items data={_.shuffle(dataToRender)} />
    }else{
      return <Items data={_.sortBy(dataToRender,[sortBy])} />
    }
  }

  return (
    <Container className="App-Container">
      <Container>Currencies supported by MoonPay</Container>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedState.checkedA}
              name="checkedA"
              onChange={handleChange}
              color="primary"
            />
          }
          label="Show currencies not supported in the US"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedState.checkedB}
              name="checkedB"
              onChange={handleChange}
              color="primary"
            />
          }
          label="Show currencies not availables in Test Mode"
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="Button"
          startIcon={<SortByAlpha />}
          onClick={()=>handleClick('name')}
        >
          Name
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="Button"
          startIcon={<SortByAlpha />}
          onClick={()=>handleClick('code')}
        >
          Symbol/Code
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="Button"
          startIcon={<Shuffle />}
          onClick={()=>handleClick('shuffle')}
        >
          Shuffle
        </Button>
      </FormGroup>
      <List className={isMobileOnly ? "List-Mobile" : isTablet ? "List-Tablet" : "List-Desktop"} >
        {renderItems()}
      </List>
    </Container>
  );
}

const mapStateToProps = state =>{
  return {
    dataReducer: state.dataReducer,
  }
};

const mapDispatchToProps = dispatch => {
  return{
    get_data: async () =>{
      try{
        const response = await api.get('/currencies');
        if(response){
          dispatch(getData(response.data));
        }
      }catch (err){
        console.log('Error fetching the data');
      }
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
