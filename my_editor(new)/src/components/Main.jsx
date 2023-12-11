import React, {useState} from 'react';
import './style/main.scss';
import {IoMdUndo,IoMdRedo, IoIosImage} from 'react-icons/io';

const { ipcRenderer } = window.require('electron');


const Main = () => {
    const filterElement=[
        {
            name:'brightness',
            maxValue:200
        },
        {
            name:'grayscale',
            maxValue:200
        },
        {
            name:'sepia',
            maxValue:200

        },
        {
            name:'saturate',
            maxValue:200
        },
        {
            name:'contrast',
            maxValue:200
        },
        {
            name:'hueRotate'
        },
        {
            name:'blur',
            maxValue:10
        },
        {
            name:'invert',
            maxValue:100
        },
        {
            name:'opacity',
            maxValue:100
        },
        {
            name:'drop-shadow',
            maxValue:50
        }
    ]
    const[property,setProperty]=useState(
        {
            name:'brightness',
            maxValue:200
        }
    )
    const[details,setDetails]=useState('')

    const [state,setstate]=useState({
        image:'',
        brightness:100,
        grayscale:0 ,
        sepia:0, 
        saturate:100,
        contrast:100,
        hueRotate:0,
        blur:0,
        invert:0,
        opacity:100,
        rotate:0,
        vertical:1,
        horizontal:1,

    })

    const inputHandle=(e)=>{
        setstate({
            ...state,
           [e.target.name] : e.target.value
        })
    }

    const leftRotate=(e)=>{
      setstate({
        ...state,
        rotate:state.rotate-90
      })  
    }
    const rightRotate=(e)=>{
        setstate({
          ...state,
          rotate:state.rotate+90
        })  
      }
    const imageHandle=(e)=>{
        if(e.target.files.length !==0){
            const reader =new FileReader()
           reader.onload=()=>{
            setstate({
                ...state,
                image:reader.result
            })
           }
           reader.readAsDataURL(e.target.files[0])
        }
    }

    const saveImage=()=>{
        const canvas = document.createElement('canvas')
        canvas.width=details.naturalWidth
        canvas.height=details.naturalHeight
        const ctx = canvas.getContext('2d')   

        ctx.filter= `brightness(${state.brightness}%) grayscale(${state.grayscale}%)sepia(${state.sepia}%)saturate(${state.saturate}%)contrast(${state.contrast}%)hue-rotate(${state.hueRotate}deg) blur(${state.blur}px) invert(${state.invert}%) opacity(${state.opacity}%)`

        ctx.translate(canvas.width/2, canvas.height/2)

        ctx.rotate(state.rotate*Math.PI/180)

        ctx.drawImage(
            details,
            -canvas.width/2,
            -canvas.height/2,
            canvas.width,
            canvas.height


        )

        const link=document.createElement('a')
        link.download='image_edit.jpg'
        link.href =canvas.toDataURL()
        link.click()

    }

    const galleryView=()=>{
        ipcRenderer.send('create-child-window');
    };
    




  return (
    <div className='image_editor'>
        <div className='card'>
            <div className="card_header">
                <h2> Image Editor Pro </h2>
            </div>
            <div className="card_body">
                <div className="sidebar">
                    <div className="side_body">
                        <div className="filter_section">
                            <span></span>
                            <div className="filter_key">
                                {
                                 filterElement.map((v,i)=>
                                 <button className={property.name===v.name ? 'active':'' } onClick={()=>setProperty(v)} key={i}>{v.name}</button>
                                 )
                                }

                            </div>
                        </div>
                        <div className="filter_slider">
                            <div className="label_bar">
                                <label htmlFor='range'>Adjust</label>
                                <span>100%</span>
                            </div>
                            <input name={property.name} onChange={inputHandle} value={state[property.name]} max={property.maxValue}  type='range'/>
                        </div>
                    </div>
                    <div className="reset">
                        <button onClick={galleryView}>Gallery View</button>
                        <button onClick={saveImage} className='save'>Save</button>
                    </div>
                </div>
                <div className="image_section">
                    <div className="image"> 
                     {
                        state.image ? <img onLoad={(e)=>setDetails(e.currentTarget)} style={{filter:`brightness(${state.brightness}%) grayscale(${state.grayscale}%)sepia(${state.sepia}%)saturate(${state.saturate}%)contrast(${state.contrast}%)hue-rotate(${state.hueRotate}deg)blur(${state.blur}px) invert(${state.invert}%) opacity(${state.opacity}%)`,transform:`rotate(${state.rotate}deg) scale(${state.vertical},${state.horizontal})`}} src={state.image} alt=""/>:
                            <label htmlFor="choose">
                                <IoIosImage/>
                                <span> Choose Image</span>
                            </label>                  
                     }

                    </div>
                    <div className="image_select">
                        <button onClick={leftRotate} className='undo'><IoMdUndo/></button>
                        <button onClick={rightRotate} className='redo'><IoMdRedo/></button>
                        <label htmlFor='choose'> Choose Image</label>
                        <input onChange={imageHandle} type="file" id='choose' />
                        
                    </div>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default Main
