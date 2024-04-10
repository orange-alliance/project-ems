import styled from '@emotion/styled';
import { FC } from 'react';
import { MatchInfoBar } from './components/match-info-bar';
import { MatchBottomBar } from './components/match-bottom-bar';
import { MatchAlliancePreview } from './components/match-alliance-preview';
import { Event, Match } from '@toa-lib/models';

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header'
    'content'
    'footer';
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  height: 100%;
  grid-area: content;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

interface Props {
  match: Match<any>;
  event: Event;
}

export const MatchPreview: FC<Props> = ({ event, match }) => {
  return (
    <Container>
      <MatchInfoBar title={match.name} />
      <Content>
        <MatchAlliancePreview
          alliance='red'
          participants={match.participants ?? []}
        />
        <MatchAlliancePreview
          alliance='blue'
          participants={match.participants ?? []}
        />
      </Content>
      <MatchBottomBar title={event.eventName} />
    </Container>
  );
};
