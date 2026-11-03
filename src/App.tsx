import React, { useCallback, useState } from 'react';
import { soundEngine } from './audio/soundEngine';
import { FixedParodyFooter, InstitutionalTopBar } from './components/LayoutChrome';
import type { EventType, OrganizacionMode, UserAnswers } from './engine/types';
import { CustomQuestionsScreen } from './screens/CustomQuestionsScreen';
import { EventSelectScreen } from './screens/EventSelectScreen';
import { LandingScreen } from './screens/LandingScreen';
import { LoadingCommitteeScreen } from './screens/LoadingCommitteeScreen';
import { ResultsScreen } from './screens/ResultsScreen';

type AppRoute = 'landing' | 'select_event' | 'loading_simple' | 'custom_questions' | 'results';

const DEFAULT_SIMPLE_ANSWERS: UserAnswers = {
  secanucasRequested: 4,
  answersById: {
    invitas_paredes: true,
    invitas_dimaria: true,
    amigo_salon: true,
    show_drones: true,
    necesitas_secanucas: true,
  },
};

export const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>('landing');
  const [mode, setMode] = useState<OrganizacionMode>('simple');
  const [eventType, setEventType] = useState<EventType>('casamiento');
  const [answers, setAnswers] = useState<UserAnswers>(DEFAULT_SIMPLE_ANSWERS);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 900000) + 100000);
  const [formatNumber, setFormatNumber] = useState<number>(1);

  const handleGoHome = useCallback(() => {
    soundEngine.stopDroneHum();
    setRoute('landing');
  }, []);

  const handleSelectMode = useCallback((chosenMode: OrganizacionMode) => {
    setMode(chosenMode);
    setRoute('select_event');
  }, []);

  const handleSelectEvent = useCallback(
    (chosenEvent: EventType) => {
      setEventType(chosenEvent);
      const freshSeed = Math.floor(Math.random() * 900000) + 100000;
      setSeed(freshSeed);
      setFormatNumber(1);

      if (mode === 'simple') {
        setAnswers(DEFAULT_SIMPLE_ANSWERS);
        setRoute('loading_simple');
      } else {
        setRoute('custom_questions');
      }
    },
    [mode]
  );

  const handleLoadingComplete = useCallback(() => {
    setRoute('results');
  }, []);

  const handleQuestionsComplete = useCallback((finalAnswers: UserAnswers) => {
    setAnswers(finalAnswers);
    setRoute('results');
  }, []);

  const handleReDrawFormat = useCallback(() => {
    setSeed((prev) => (prev * 1664525 + 1013904223) >>> 0);
    setFormatNumber((prev) => prev + 1);
  }, []);

  return (
    <div className="app-shell">
      <InstitutionalTopBar
        onGoHome={handleGoHome}
        showHomeButton={route !== 'landing'}
      />

      {route === 'landing' && <LandingScreen onSelectMode={handleSelectMode} />}

      {route === 'select_event' && (
        <EventSelectScreen
          mode={mode}
          onSelectEvent={handleSelectEvent}
          onBack={handleGoHome}
        />
      )}

      {route === 'loading_simple' && (
        <LoadingCommitteeScreen onComplete={handleLoadingComplete} />
      )}

      {route === 'custom_questions' && (
        <CustomQuestionsScreen
          seed={seed}
          onComplete={handleQuestionsComplete}
          onBack={() => setRoute('select_event')}
        />
      )}

      {route === 'results' && (
        <ResultsScreen
          eventType={eventType}
          mode={mode}
          answers={answers}
          seed={seed}
          formatNumber={formatNumber}
          onReDrawFormat={handleReDrawFormat}
          onStartOver={() => {
            soundEngine.stopDroneHum();
            setRoute('select_event');
          }}
        />
      )}

      <FixedParodyFooter />
    </div>
  );
};
