import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'
import {v4} from 'uuid'
import API from '../utils/api'
// React DnD
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

// Modal
import Modal from 'react-modal'

// Form
import {InputField, InputGroup} from '../components/Forms'


const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

const Task = () => {
  const {id, title} = useParams()

  const [dropId, setDropId] = useState(null)
  const [modalIsOpen,setIsOpen] = useState(false)
  const [values, setValues] =  useState({
    pid: id,
    title_task: ''
  })

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const [state, setState] = useState(null)


  useEffect(() => {
    API.get(`/api/v1/tasks/${id}`)
    .then((res) => {
      if(res.status === 200) {
        return res.data.tasks
      }
      throw res
    })
    .then((data) => {
      let todo = _.map(data, function(o) {
        if (!o.ischeck) return o
      })

      let done = _.map(data, function(o) {
        if(o.ischeck) return o
      })
      todo = _.without(todo, undefined)
      done = _.without(done, undefined) 
      setState({
        "todo":{
          id: 'tdw2',
          title: "Todo",
          items: todo
        },
        "doing":{
          id:'ddas1',
          title: "Doing",
          items: []
        },
        "done":{
          id: 'done1',
          title: "Done",
          items: done
        }
      })
    })
  }, [])

  const handleUpdate = prop => e => {
    const {id} = prop
    console.log(id)
    API.post(`/api/v1/tasks/${id}`)
    .then((res) => {
      if(res.status === 200) {
        console.log(res.data)
      }
      throw res
    })
  }

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      if(destination.droppableId === "done"){
        let items = state[source.droppableId].items[source.index]
        return handleUpdate(items.tid)
      }
      return
    }

    const itemCopy = {...state[source.droppableId].items[source.index]}
    setState(prev => {
      prev = {...prev}
      prev[source.droppableId].items.splice(source.index, 1)
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleSubmit = e => {
    console.log('submit')
    e.preventDefault()
    console.log(values)
    API.post('/api/v1/tasks', values)
      .then(() => {
        console.log("success")
      })
      .catch((error) => {
        console.error(error)
      })
  }


  return (
      <ContentHeader>
        <NavHeader>
          <NavHeaderItem>
            <ProjectTitle>
              {title}
            </ProjectTitle>
          </NavHeaderItem>
          <NavHeaderItem style={{marginLeft: '5px'}}>
            <Button
              bgColor='rgba(255, 255, 255, 0.2)'
              bgHover='rgba(255, 255, 255, 0.4)'
              data-tip
              data-for='crtask'
              onClick={openModal}
            >
              <i class="fas fa-plus"></i>
            </Button>
            <ReactTooltip id="crtask" place="top" effect="solid">
              Tambah Task
            </ReactTooltip>
          </NavHeaderItem>
        </NavHeader>
          <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={modalStyle}
              contentLabel="Form Modal"
            >
              <form onSubmit={handleSubmit}>
                <h3>Tambah Task</h3>
                <InputGroup>
                  <InputField
                    placeholder='Masukan judul task'
                    type='text'
                    onChange={handleChange('title_task')}
                    autoFocus
                    required
                  />
                </InputGroup>
                <Button
                  type='submit'
                >
                  Simpan
                </Button>
              </form>
          </Modal>
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return(
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <Content>
                      <ListContent
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <ListContentHeader>
                          <ListTitle>
                            {data.title}
                          </ListTitle>
                          {data.items.map((el, index) => {
                            return(
                              <Draggable
                                key={el.tid}
                                index={index}
                                draggableId={`item ${el.tid}`}
                              >
                                {(provided, snapshot) => {
                                  return(
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {el.title_task}
                                    </Card>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </ListContentHeader>
                      </ListContent>
                    </Content>
                  )
                }}
              </Droppable>
            )})
          }
        </DragDropContext>
      </ContentHeader>
  )
}

const ContentHeader = styled.div`
  height: auto;
  padding: 8px 4px 4px 8px;
  position: relative;
`
const NavHeader = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 56px;
  padding: 0;
  margin-bottom: 0;
  list-style: none;
  margin-top: 0px;
`
const NavHeaderItem = styled.li`
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
`
const ProjectTitle = styled.h3`
  font-weight: 500;
`

const Content = styled.div`
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`
const ListContent = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`
const ListContentHeader = styled.div`
  flex: 0 0 auto;
  padding: 10px 8px;
  position: relative;
  min-height: 20px;
`
const ListTitle = styled.h3`
  font-weight: 600;
  margin: 0 0 8px;
`
const Card = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 10px;
  font-size: 14px;
  background-color: ${props => props.isDone || 'white'}
`

export default Task
