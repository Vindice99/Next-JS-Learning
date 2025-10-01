import React, { CSSProperties } from 'react'
import { Html, Body, Container, Text, Link, Preview, Tailwind } from '@react-email/components'
const WelcomeTemplate = ({name} : {name:string}) => {
  return (
    <Html>
        <Preview>Welcome aboard!</Preview>
        <Tailwind>
          <Body className='bg-linear-to-r/srgb from-indigo-500 to-teal-400'>
            <Container>
                <Text style={heading}>
                    Hello {name}
                </Text>
                <Link href=''>Link</Link>
            </Container>
        </Body>
        </Tailwind>
    </Html>
  )
}
const body : CSSProperties = {
  background: '#fff'
}

const heading : CSSProperties ={
  fontSize: '32px',
  color: 'blue'
}

export default WelcomeTemplate