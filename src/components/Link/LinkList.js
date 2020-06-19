import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../../firebase/context';
import LinkItem from './LinkItem';

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const isNewPage = props.location.pathname.includes('new');

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    setLoading(true)
    firebase.db
      .collection('links')
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot);
    setLoading(false);
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
    setLoading(false);
  }

  function renderLinks() {
    if (isNewPage) {
      return links;
    }
    // sort the array with great vote count on top
    const topLinks = links
      .slice()
      .sort((link1, link2) => link2.votes.length - link1.votes.length);
    return topLinks;
  }
  return (
    <div style={{ opacity: loading ? 0.25 :  1 }}>
      {renderLinks().map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
