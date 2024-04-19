import Layout from '@/components/layout';
import React, {useState, useEffect} from 'react';
import { Box, Image, Text, Badge, Button, Divider, Heading, Center, Tag, Flex, Spinner,
    VStack, HStack, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Link, 
    Spacer} from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';

function CourseVideo() {
  const { courseId, courseSubsectionId } = useParams();
  const [video, setVideo] = useState({});

  const getVideo = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/course/get_sub_section_video/'+courseSubsectionId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideo(data.response)
    }
    catch (error) {
        console.error(`Could not get courses: ${error}`);
    }
    }

    useEffect(() => {
        getVideo();
      }, []);

  return (
    <Layout>
        <div className='player-wrapper' style={{ position: 'relative', paddingTop: '56.25%'  }}>
            <ReactPlayer
                url={video}
                className='react-player'
                playing
                width='100%'
                height='75%'
                style={{ position: 'absolute', top: '0', left: '0' }}
                controls={true}
                config={{
                    file: {
                        attributes: {
                            onContextMenu: e => e.preventDefault()
                        }
                    }
                }}
            />
        </div>
    </Layout>
  );
}

export default CourseVideo;