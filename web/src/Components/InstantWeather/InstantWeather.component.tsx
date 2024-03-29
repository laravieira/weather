import { useAppSelector, useServerAddress } from '../../hooks';
import { ReactNode, useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

export type InstantWeatherModel = {
    idlocale: number,
    temperature: number,
    icon: string,
    condition: string,
    humidity: number,
    sensation: number,
    windVelocity: number,
    pressure: number,
    date: string
}

function InstantWeather() {
    const locale = useAppSelector(state => state.locale.value);
    const tempUnity = useAppSelector(state => state.temperature.value);
    const [weather, setWeather] = useState<InstantWeatherModel>();
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar: notify } = useSnackbar();
    const { instant } = useServerAddress();
    let lastLocale: any|undefined;

    useEffect(() => {
        if(!locale || lastLocale && lastLocale === locale)
            return;
        lastLocale = locale;
        setLoading(true);
        fetch(instant(locale.idlocale))
            .then(response => {
                setLoading(false);
                if(response.status === 404 || response.status === 500) {
                    notify('Não temos o clima dessa cidade.', { variant: 'info' });
                    return undefined;
                }else return response.json();
            })
            .then(weather => setWeather(weather))
            .catch(err => {
                setLoading(false);
                console.error(err);
                notify('Alguma coisa deu errado.', { variant: 'error'});
            });
    }, [locale]);

    function renderSubInfo(caption: string, info: string|number, unity: ReactNode) {
        return <div className="sm:text-left gap-0">
            <div className="hidden sm:flex">
                <Typography variant='h4' className="w-fit">
                    { info }
                </Typography>
                <Typography variant='subtitle1' className="self-end w-fit">
                    { unity }
                </Typography>
            </div>
            <div className="flex sm:hidden">
                <Typography variant='h3' className="w-fit">
                    { info }
                </Typography>
                <Typography variant='subtitle1'>
                    { unity }
                </Typography>
            </div>
            <Typography variant='caption'>
                { caption }
            </Typography>
        </div>;
    }

    function renderContent(weather: InstantWeatherModel) {
        const { temperature, windVelocity, pressure, sensation, humidity, condition } = weather;
        return <>
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-x-4">
                <Typography variant='h1'>
                    { tempUnity === 'c' ? temperature + '°C' : ((temperature * 1.8) + 32).toFixed(0) + '°F' }
                </Typography>
                <Typography variant='h4' className="lg:hidden pb-3">
                    { condition }
                </Typography>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Typography variant='h6' className="hidden lg:block">
                    { condition }
                </Typography>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 sm:gap-8 max-w-[400px] w-full sm:max-w-full mx-auto">
                    { renderSubInfo('Sensação', tempUnity === 'c'
                        ? sensation
                        : ((sensation * 1.8) + 32).toFixed(0), tempUnity === 'c'
                            ? <div className="mt-[.5rem] sm:mt-[-2.5rem]">°C</div>
                            : <div className="mt-[.5rem] sm:mt-[-2.5rem]">°F'</div>
                        )
                    }
                    { renderSubInfo('Humidade', humidity, <div className="mt-[.5rem] sm:mt-[-2.5rem]">%</div>)}
                    { renderSubInfo('Vento', tempUnity === 'c'
                        ? windVelocity
                        : (windVelocity/1.609).toFixed(0), tempUnity === 'c'
                            ? <div className="mt-[1.7rem] sm:mt-0">km/h</div>
                            : <div className="mt-[1.7rem] sm:mt-0">mph</div>
                        )
                    }
                    { renderSubInfo('Pressão', pressure, <div className="mt-[1.7rem] sm:mt-0">hPa</div>) }
                </div>
            </div>
        </>;
    }

    function renderSkeleton() {
        return loading ? <CircularProgress className="mx-auto" /> : <></>
    }

    return <div className="flex gap-10 items-center max-w-[720px] mx-auto flex-col lg:flex-row">
        { weather && !loading ? renderContent(weather) : renderSkeleton() }
    </div>;
}

export default InstantWeather;