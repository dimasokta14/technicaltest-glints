import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import API from '../utils/api'

const Project = () => {
  const [data, setData] = useState()

  useEffect(() => {
    API.get('/api/v1/projects')
      .then((res) => {
        if(res.status === 200) {
          return res.data.projects
        }
        throw res
      })
      .then((data) => {
        setData(data)
      })

  },[])

  
  return (
    <ProjectWrapper>
      {data && data.map((item, index) => (            
            <ProjectList
              key={index}
            >
              <ProjectCard
                href={`/project/${item.pid}/${item.title}`}
              >
                <ProjectTitle>
                  {item.title}
                </ProjectTitle>
              </ProjectCard>
            </ProjectList>
      ))}
    </ProjectWrapper>
  )
}

const ProjectWrapper = styled.ul`
  list-styled: none;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`
const ProjectList = styled.li`
  box-sizing: border-box;
  padding: 4px 8px;
  position: relative;
  width: 25%;
  cursor: pointer;
  list-style: none;
`
const ProjectCard = styled.a`
  background-color: #fff;
  color: #172B4D;
  line-height: 20px;
  padding: 15px;
  position: relative;
  text-decoration: none;
  display: block;
  min-height: 20px;
  min-height: 50px;
  border-radius: 5px;
`
const ProjectTitle = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
`


export default Project
