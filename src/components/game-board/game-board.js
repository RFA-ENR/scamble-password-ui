import React, { useCallback, useEffect, useState } from 'react';
import './game-board.css';
import axios from 'axios';
import { Button } from '@mui/material';
const GameBoard = ({ randomList, setRandomList, resetList }) => {
  const [bgImg, setBgImg] = useState('');

  const selectImage = useCallback((imgIndex) => {
    resetList();
    axios.get(`/img?imgIndex=${imgIndex}`).then((res) => {
      setBgImg(res.data);
    });
  }, []);

  useEffect(() => {
    selectImage(1);
  }, [selectImage]);
  const move = (val) => {
    let zeroIndex = randomList.indexOf(0);
    let valIndex = randomList.indexOf(val);

    if (valIndex + 3 === zeroIndex || valIndex - 3 === zeroIndex) {
      swap(valIndex, zeroIndex);
    } else if (valIndex + 1 === zeroIndex) {
      swap(valIndex, zeroIndex);
    } else if (valIndex - 1 === zeroIndex) {
      swap(valIndex, zeroIndex);
    }
  };

  const swap = (valIndex, zeroIndex) => {
    let temArray = [...randomList];
    temArray[zeroIndex] = randomList[valIndex];
    temArray[valIndex] = 0;
    setRandomList(temArray);
  };

  const tileStyle = (index) => {
    const style = {
      backgroundSize: '380px, 240px',
      backgroundImage: index !== 0 ? `url(${bgImg})` : '',
      backgroundPosition: index !== 0 ? `-${((index - 1) % 3) * 120}px -${80 * Math.floor((index - 1) / 3)}px` : '',
    };

    return style;
  };

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button className={'image-button'} variant="contained" onClick={() => selectImage(1)}>
          Image 1
        </Button>
        <Button className={'image-button'} variant="contained" onClick={() => selectImage(2)}>
          Image 2
        </Button>
        <Button className={'image-button'} variant="contained" onClick={() => selectImage(3)}>
          Image 3
        </Button>
      </div>
      <div className="board">
        {randomList.map((tile) => (
          <div key={tile} onClick={() => move(tile)} className={tile ? 'tile' : 'emptyTile'} style={tileStyle(tile)}>
            &nbsp;
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
