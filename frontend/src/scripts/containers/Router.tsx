import { Locale } from 'basx/i18n';
import Error from 'scripts/pages/Error';
import React, { Suspense } from 'react';
import routes from 'scripts/store/routes';
import { useCombiner } from 'scripts/store';
import loadLocale from 'scripts/locale/index';
import NotFound from 'scripts/pages/NotFound';
import Loader from 'scripts/components/Loader';
import { RoutingContext } from 'diox/extensions/router';
import ErrorWrapper from 'scripts/components/ErrorWrapper';

type LazyComponent = () => Promise<{
  default: React.ComponentType<{
    locale: Locale;
  }>
}>;

/**
 * App router.
 */
export default function Router(): JSX.Element {
  const router = useCombiner<RoutingContext>('router');
  const [locale, setLocale] = React.useState<Locale | null>(null);
  const [loader] = React.useState(<Loader />);
  const [errorPage, setErrorPage] = React.useState(loader);

  React.useEffect(() => {
    loadLocale().then(setLocale);
  }, []);

  React.useEffect(() => {
    if (locale !== null) {
      setErrorPage(<Error locale={locale} />);
    }
  }, [locale]);

  const currentPage = React.useMemo(() => {
    const page = routes[router.route || ''] as LazyComponent;

    if (locale === null) {
      return loader;
    }

    if (page === undefined) {
      return <NotFound locale={locale} />;
    }

    // FOR REDIRECT LOGIC ONLY.
    // const newRoute = router.path;
    // if (newRoute !== null && newRoute !== router.path) {
    //   mutate('router', 'NAVIGATE', newRoute);
    //   return loader;
    // }
    const Component = React.lazy(page);

    return <Component locale={locale} />;
  }, [router.route, locale, loader]);

  return (
    <ErrorWrapper fallback={errorPage}>
      <Suspense fallback={loader}>
        {currentPage}
      </Suspense>
    </ErrorWrapper>
  );
}

Router.propTypes = {};
Router.defaultProps = {};
Router.displayName = 'Router';
