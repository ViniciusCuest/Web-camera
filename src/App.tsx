import React from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Box, ButtonFixedFooterLayout, ButtonSecondary, Text4, ThemeContextProvider, VIVO_NEW_SKIN, getSkinByName, skinVars } from '@telefonica/mistica';
import styles from './styles.module.css';

export default function App() {
  const width = global.window.innerWidth;
  const height = global.window.innerHeight;

  const aspectRatio = width / height;

  const onNewScanResult = (decodedText: string) => {
    window.alert(decodedText);
  }

  const handleStartScanning = async (html5QrCode: Html5Qrcode) => {
    const userAgent = navigator.userAgent;
    const videoStream = await window.navigator.mediaDevices.getUserMedia({
      video: userAgent.match(/Android/i)
        ? {
          facingMode: 'environment',
          aspectRatio,
          //zoom: 2,
          //focusMode: 'continuous',
        }
        : {
          //zoom: 4,
        },
    });

    try {
      html5QrCode
        .start(
          videoStream.getVideoTracks()[0].id,
          {
            fps: 10,
            videoConstraints: {
              facingMode: 'environment',
              //zoom: 4,
              aspectRatio,
            },
          },
          onNewScanResult,
          () => {
            return;
          },
        )
        .catch(() => {
          console.error('VOCÊ NÃO TEM PERMISSÃO');
        });
    } catch {
      if (userAgent.match(/Android/i))
        console.log('ACEITE A PERMISSÃO');
      else {
        console.error('VOCÊ NÃO TEM PERMISSÃO');
      }
    }
  };

  React.useEffect(() => {
    const html5QrCode = new Html5Qrcode('video-area', {
      useBarCodeDetectorIfSupported: true,
      verbose: false,
      formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
    });

    handleStartScanning(html5QrCode);

    return () => {
      html5QrCode
        .stop()
        .then(() => {
          return;
        })
        .catch(() => {
          return;
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContextProvider theme={{
      skin: getSkinByName(VIVO_NEW_SKIN),
      colorScheme: 'light',
      i18n: {
        locale: 'pt-BR',
        phoneNumberFormattingRegionCode: 'BR',
      },

    }}>
      <ButtonFixedFooterLayout
        isFooterVisible
        containerBgColor={'#000000'}
        footerBgColor={'#000000'}
        button={
          <ButtonSecondary
            onPress={() => {

            }}
            style={{
              background:
                skinVars.colors.buttonSecondaryBorderInverse,
            }}
          >
            {'Digitar código'}
          </ButtonSecondary>
        }
      >
        <Box className={styles.overlay}>
          <Box className={styles.header}>
            <Box className={styles.info_header}>
              <Text4
                textAlign="center"
                medium
                color={skinVars.colors.textPrimaryInverse}
              >
                {'Posicione o código de barras na linha'}
              </Text4>
              <Text4
                textAlign="center"
                medium
                color={skinVars.colors.textPrimaryInverse}
              >
                {'e aguarde a leitura automática'}
              </Text4>
            </Box>
          </Box>
          <Box className={styles.scanning_area}>
            <div
              id="video-area"
              data-testid="video"
              className={styles.videos}
            />
            <hr
              className={styles.divider}
              style={{
                backgroundColor: `${skinVars.colors.buttonPrimaryBackground}`,
                borderColor: `${skinVars.colors.buttonPrimaryBackground}`,
              }}
            />
          </Box>
        </Box>
      </ButtonFixedFooterLayout>
    </ThemeContextProvider>
  );
}