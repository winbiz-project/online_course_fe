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
      const response = await fetch('https://online-course-be.vercel.app/course/get_sub_section_video/'+courseSubsectionId);
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
          <div style={{
            position: 'relative',
            paddingTop: '40%',
            backgroundColor: '#000',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          }}>
            <ReactPlayer
              url={video}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
              }}
              playing
              width='100%'
              height='100%'
              controls
              config={{
                file: {
                  attributes: {
                    onContextMenu: e => e.preventDefault(),
                    controlsList: 'nodownload'  // this will hint the browser to disallow video downloads
                  }
                }
              }}
            />
          </div>
        </Layout>
      );
}

export default CourseVideo;