import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
    const { user } = profile;

    return (
        <>
            <Card style={{ textAlign: 'center', width: '18rem' }} className='mb-3'>
                <Link to={`/profile/${user._id}`}>
                    <Card.Img
                        variant='top'
                        src={profile.pfp}
                        style={{ height: '300px', objectFit: 'cover' }}
                    />
                </Link>

                <Card.Body>
                    <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none' }}>
                        <Card.Title as='div'>
                            <h4>{user.name}</h4>
                        </Card.Title>
                    </Link>
                    <Card.Text>“{profile.bio}”</Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                    <ListGroupItem>Class of {profile.batch}</ListGroupItem>
                    <ListGroupItem>{profile.major}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Link to={`/profile/${user._id}`} className='btn btn-primary'>
                        View Profile
                    </Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProfileCard;
