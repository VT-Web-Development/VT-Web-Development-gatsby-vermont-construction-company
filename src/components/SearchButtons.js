import React from 'react'
import styled from 'styled-components'

const SearchButtons = ({ projects, setProjects, setBackToAll }) => {
  const [index, setIndex] = React.useState(0)

  const projectDatas = projects.map(projectData => {
    console.log(projectData)
    return projectData.node.data.body[0].items
  })

  const tempTypes = [
    ...new Set(
      projectDatas.map(projectData => {
        return projectData.map(item => {
          return item.type.text
        })
      })
    ),
  ]

  const types = tempTypes.map(item => {
    return ['all', ...item]
  })

  const showProjects = (type, typeIndex) => {
    setIndex(typeIndex)
    if (type === 'all') {
      setBackToAll()
    } else {
      const tempProjects = projectDatas.map(projectData => {
        return projectData.map(item => {
          return item.type.text === type
        })
      })
      setProjects(tempProjects)
    }
  }

  return (
    <Wrapper>
      {types.map(item => {
        return item.map((type, typeIndex) => {
          return (
            <button
              key={typeIndex}
              className={index === typeIndex ? 'active' : undefined}
              onClick={() => showProjects(type, typeIndex)}
            >
              {type}
            </button>
          )
        })
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  margin-bottom: 0;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 0.5rem;
    text-transform: capitalize;
    background: transparent;
    border: transparent;
    color: var(--clr-grey-6);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    transition: var(--transition);
  }
  button:hover,
  button.active {
    box-shadow: 0px 1.5px 0 var(--clr-grey-6);
  }
`

export default SearchButtons
