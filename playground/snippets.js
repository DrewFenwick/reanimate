const snippets = [{"title": "Hello World","url": "https://reanimate.clozecards.com/NIHR92zCsdg/298.svg","code": "-- This is the interactive Reanimate Playground\n\n-- Here you can write Haskell code and have it\n-- render directly to your browser.\n\n-- There are more examples available if you click\n-- on the 'collections' icon to the far right\n\nanimation :: Animation\nanimation = scene $ do\n  newSpriteSVG_ $ mkBackground \"white\"\n  logo <- oNew $ center $ latex \"Reanimate\"\n  oModify logo $ oScale .~ 3\n\n  oShowWith logo oFadeIn\n  oTweenS logo 1 $ \\t -> do\n    oScale %= \\prev -> fromToS prev 2 t\n    oTopY %= \\prev -> fromToS prev screenTop t\n\n  haskell <- oNew $ center $ withStrokeColor \"black\" $ latex \"Haskell\"\n  oModify haskell $ oScale .~ 3\n  oShowWith haskell oDraw\n  oTweenS haskell 1 $ \\t -> do\n    oScale %= \\prev -> fromToS prev 2 t\n    oBottomY %= \\prev -> fromToS prev screenBottom t\n\n  features <- mapM (oNew . scale 3 . center . latex)\n    [\"SVG\", \"\\\\LaTeX\", \"Animation\", \"Windows\", \"Linux\", \"MacOS\", \"Browsers\"]\n  oShowWith (head features) $ adjustDuration (*3) . oScaleIn\n  featureChain features\n\n  wait (-1)\n  fork $ oHideWith logo oFadeOut\n  fork $ oHideWith haskell oFadeOut\n\nreplace :: Object s a -> Object s b -> Scene s ()\nreplace a b = do\n  fork $ oHideWith a $ adjustDuration (*3) . oScaleOut\n  wait 0.2\n  oShowWith b $ adjustDuration (*3) . oScaleIn\n\nfeatureChain :: [Object s a] -> Scene s ()\nfeatureChain (x:y:xs) = do\n    replace x y\n    featureChain (y:xs)\nfeatureChain [x] = do\n  oHideWith x $ adjustDuration (*3) . oScaleOut\nfeatureChain [] = return ()\n"}
  ,{"title": "Composition","url": "https://reanimate.clozecards.com/CONglUu1SIK/150.svg","code": "animation :: Animation\nanimation = docEnv $ scene $ do\n  play $ drawBox `parA` drawCircle\n    & label \"parA\"\n  play $ drawBox `seqA` drawCircle\n    & label \"seqA\"\n  play $ drawBox `andThen` drawCircle\n    & label \"andThen\"\n\nlabel txt = addStatic $\n  withFillOpacity 1 $ withStrokeWidth 0 $\n  withFillColor \"black\" $\n  translate screenLeft (screenBottom+0.2) $\n  latex txt\n"}
  ,{"title": "Color Maps","url": "https://reanimate.clozecards.com/D2qhcmUMxQc/60.svg","code": "animation :: Animation\nanimation = docEnv $ scene $ do\n  play $ staticFrame 1 (showColorMap parula)\n    & label \"Parula\"\n  play $ staticFrame 1 (showColorMap viridis)\n    & label \"Viridis\"\n  play $ staticFrame 1 (showColorMap turbo)\n    & label \"Turbo\"\n  play $ staticFrame 1 (showColorMap greyscale)\n    & label \"Greyscale\"\n\nlabel txt = overlay $\n  withFillOpacity 1 $ withStrokeWidth 0 $\n  withFillColor \"white\" $\n  translate screenLeft (screenBottom+0.2) $\n  latex txt\n\noverlay svg ani = ani `parA` staticFrame (duration ani) svg\n"}
  ,{"title": "Try it live","url": "https://reanimate.clozecards.com/OwjMi4FCJ4Z/90.svg","code": "background = \"lightblue\"\n\nshape :: SVG\nshape = mkCircle 4\n--shape = mkRect 6 6\n--shape = mkLine (screenLeft, screenBottom) (screenRight, screenTop)\n\nanimation :: Animation\nanimation = docEnv $\n  addStatic (mkBackground background) $\n  playThenReverseA $\n  signalA (curveS 2) $\n  setDuration 3 $ animate $ \\t ->\n  partialSvg t $ pathify shape\n"}
  ,{"title": "Basic Objects","url": "https://reanimate.clozecards.com/CjGaiUUQ1eT/90.svg","code": "env =\n  addStatic (mkBackground \"white\") .\n  mapA (withStrokeColor \"black\")\n\nanimation :: Animation\nanimation = env $\n  scene $ do\n    circ <- newObject $ Circle 3\n    oModify circ $\n      oContext .~ withFillColor \"pink\"\n    box <- newObject $ Rectangle 5 5\n    oModify box $\n      oContext .~ withFillColor \"lightblue\"\n  \n    oShowWith circ oGrow; wait 1\n    oTransform circ box 1; wait 1\n    oHideWith box oFadeOut; wait 1\n"}
  ,{"title": "LaTeX","url": "https://reanimate.clozecards.com/F++VVYnubuc/181.svg","code": "env =\n  addStatic (mkBackground \"white\") .\n  mapA (withStrokeColor \"black\")\n\nanimation :: Animation\nanimation = env $\n  scene $ do\n    drawLatex \"e^{i\\\\pi}+1=0\"\n    drawLatex \"\\\\sum_{k=1}^\\\\infty {1 \\\\over k^2} = {\\\\pi^2 \\\\over 6}\"\n    drawLatex \"\\\\sum_{k=1}^\\\\infty\"\n    wait 1\n\ndrawLatex txt = do\n    -- Draw outline\n    fork $ do\n      play $ animate $ \\t ->\n        withFillOpacity 0 $\n        partialSvg t svg\n      -- Fade outline\n      play $ animate $ \\t ->\n        withFillOpacity 0 $\n        withStrokeWidth (defaultStrokeWidth*(1-t))\n        svg\n    wait 0.7\n    -- Fill in letters\n    play $ animate $ \\t ->\n      withFillOpacity t $ withStrokeWidth 0\n      svg\n    -- Hold static image and then fade out\n    play $ staticFrame 2 (withStrokeWidth 0 svg)\n      & applyE (overEnding 0.3 fadeOutE)\n  where\n    svg = scale 2 $ center $ latexAlign txt\n"}
  ,{"title": "Easing Functions","url": "https://reanimate.clozecards.com/Bc6Shtcsjgk/45.svg","code": "animation :: Animation\nanimation = docEnv $ pauseAtEnd 1 $ scene $ do\n  showEasing 0 \"curveS\" (curveS 2)\n  showEasing 1 \"bellS\" (bellS 2)\n  showEasing 2 \"constantS\" (constantS 0.7)\n  showEasing 3 \"oscillateS\" oscillateS\n  showEasing 4 \"powerS\" (powerS 2)\n  showEasing 5 \"reverseS\" reverseS\n  showEasing 6 \"id\" id\n\nshowEasing nth txt fn = do\n  let yOffset | even nth = 0\n              | odd nth  = -1\n      xOffset = -6 + fromIntegral nth*2\n  newSpriteSVG_ $\n  \ttranslate xOffset yOffset $\n    label txt\n  fork $ play $ mapA (translate xOffset 0) $\n    mapA (rotate 90) $\n    mapA (scale (screenHeight/screenWidth * 0.6)) $\n    signalA fn drawProgress\n\nlabel txt =\n  translate 0 (-2.5) $\n  scale 0.7 $\n  center $\n  withStrokeWidth 0 $\n  withFillOpacity 1\n  svg\n  where\n    svg = latex txt\n"}
  ,{"title": "Easing Graphs","url": "https://reanimate.clozecards.com/PYgakFrzwyp/255.svg","code": "colorPalette = parula -- try: viridis, sinebow, turbo, cividis\nfns =\n [(\"curveS\", curveS 2)\n ,(\"bellS\", bellS 2)\n ,(\"constantS\", constantS 0.7)\n ,(\"oscillateS\", oscillateS)\n ,(\"powerS\", powerS 2)\n ,(\"reverseS\", reverseS)\n ,(\"id\", id)\n ]\n\nanimation :: Animation\nanimation = docEnv $ pauseAtEnd 1 $ scene $ do\n  newSpriteSVG_ $ mkBackground \"white\"\n  play $ signalA (curveS 2) $ animate $ \\t -> partialSvg t grid\n  newSpriteSVG_ grid\n  wait 1\n  flip mapM_ (zip [0..] fns) $ \\(nth, (txt, fn)) -> do\n    let color = promotePixel $ colorPalette (nth / fromIntegral (length fns-1))\n    showEasing nth txt fn color\n  {- showEasing 3 \"oscillateS\" oscillateS\n  showEasing 4 \"powerS\" (powerS 2)\n  showEasing 5 \"reverseS\" reverseS\n  showEasing 6 \"id\" id -}\n\ngridOffset = -2\ngridHeight = 5\ngridWidth = 8\n\ngrid :: SVG\ngrid = translate gridOffset 0 $\n  withStrokeWidth defaultStrokeWidth $\n  withStrokeColor \"grey\" $ mkGroup\n  [ mkPath $ concat\n    [[ SVG.MoveTo SVG.OriginAbsolute [V2 (-gridWidth/2) (gridHeight/2-n)]\n     ,SVG.HorizontalTo SVG.OriginRelative [gridWidth] ]\n    | n <- [1..gridHeight-1]\n    ]\n  , mkPath \n    [ SVG.MoveTo SVG.OriginAbsolute [V2 (-gridWidth/2) (gridHeight/2)]\n    , SVG.VerticalTo SVG.OriginRelative [-gridHeight]\n    , SVG.HorizontalTo SVG.OriginRelative [gridWidth]\n    , SVG.VerticalTo SVG.OriginRelative [gridHeight]\n    , SVG.EndPath\n    ]\n  ]\n\nshowEasing nth txt fn color = do\n  let steps = 100\n      slope = withStrokeColorPixel color $\n        translate gridOffset 0 $ mkLinePath\n        [ ((x/steps-0.5)*gridWidth, (y-0.5)*gridHeight)\n        | x <- [0..steps]\n        , let y = fn (x/steps) ]\n  s <- newSpriteSVG $\n    withFillColorPixel color $\n    translate (gridWidth/2+gridOffset+0.5) (gridHeight/2-nth) $\n      label txt\n  spriteE s $ overBeginning 0.2 fadeInE\n  play $ animate $ \\t -> partialSvg t slope\n  newSpriteSVG_ slope\n  wait 1\n  \nlabel txt = withStrokeColor \"black\" $\n  withStrokeWidth (defaultStrokeWidth*2) $\n  withFillOpacity 1 $\n  latex txt\n"}
  ,{"title": "Object Positions","url": "https://reanimate.clozecards.com/LRZe4V6frOI/195.svg","code": "env =\n  addStatic (mkBackground \"white\") .\n  mapA (withStrokeColor \"black\")\n\nanimation :: Animation\nanimation = env $\n  scene $ do\n    -- Configure objects\n    txt <- newText \"Center\"\n    top <- newText \"Top\"\n    oModifyS top $ \n      oTopY .= screenTop\n    topR <- newText \"Top right\"\n    oModifyS topR $ do\n      oTopY .= screenTop\n      oRightX .= screenRight\n    botR <- newText \"Bottom right\"\n    oModifyS botR $ do\n      oTranslateY .= screenBottom+0.5\n      oRightX .= screenRight\n    botL <- newText \"Bottom left\"\n    oModifyS botL $ do\n      oTranslateY .= screenBottom+0.5\n      oLeftX .= screenLeft\n    topL <- newText \"Top left\"\n    oModifyS topL $ do\n      oTopY .= screenTop\n      oLeftX .= screenLeft\n    -- Show objects\n    oShow txt\n    wait 1\n    switchTo txt top\n    switchTo top topR\n    switchTo topR botR\n    switchTo botR botL\n    switchTo botL topL\n    switchTo topL txt\n\nswitchTo src dst = do\n  fork $ oHideWith src oFadeOut\n  oShowWith dst oFadeIn\n  wait 1\n\nnewText txt =\n  newObject $ scale 1.5 $ centerX $ latex txt\n"}
  ,{"title": "Camera","url": "https://reanimate.clozecards.com/JlWlOpJvDds/150.svg","code": "animation :: Animation\nanimation = docEnv $ mapA (withFillOpacity 1) $ scene $ do\n  cam <- newObject Camera\n\n  txt <- newObject $ center $ latex \"Fixed (non-cam)\"\n  oModifyS txt $ do\n    oTopY   .= screenTop \n    oZIndex .= 2\n\n  circle <- newObject $ withFillColor \"blue\" $ mkCircle 1\n  cameraAttach cam circle\n  circleRight <- oRead circle oRightX\n\n  box <- newObject $ withFillColor \"green\" $ mkRect 2 2\n  cameraAttach cam box\n  oModify box $ oLeftX .~ circleRight\n  boxCenter <- oRead box oCenterXY\n\n  small <- newObject $ center $ latex \"This text is very small\"\n  cameraAttach cam small\n  oModifyS small $ do\n    oCenterXY .= boxCenter\n    oScale    .= 0.1\n  \n  oShow txt\n  oShow small\n  oShow circle\n  oShow box\n\n  wait 1\n\n  cameraFocus cam boxCenter\n  waitOn $ do\n    fork $ cameraPan cam 3 boxCenter\n    fork $ cameraZoom cam 3 15\n  \n  wait 2\n  cameraZoom cam 3 1\n  cameraPan cam 1 (V2 0 0)\n"}
  ,{"title": "Fonts","url": "https://reanimate.clozecards.com/PvwohDtNPN9/150.svg","code": "fonts :: [(T.Text, TexConfig)]\nfonts =\n  [ (\"Computer Modern\", defaultCfg)\n  , (\"Calligra\", calligra)\n  , (\"Noto\", noto)\n  , (\"Helvetica\", helvet)\n  , (\"Liberine\", libertine) ]\n\nanimation :: Animation\nanimation = env $\n  scene $ do\n    forM_ fonts $ \\(name, cfg) -> do\n      play $ showCfg name cfg\n        & setDuration 2\n        & applyE (overBeginning 0.3 fadeInE)\n        & applyE (overEnding 0.3 fadeOutE)\n\ndefaultCfg = TexConfig LaTeX [] []\n\nshowCfg :: T.Text -> TexConfig -> Animation\nshowCfg name cfg = scene $ do\n  let title = scale 2 $ center $\n        latexCfg cfg name\n      line1 = center $ latexCfg cfg\n        \"Pack My Box\"\n      line2 = center $ latexCfg cfg\n        \"With Five Dozen\"\n      line3 = center $ latexCfg cfg\n        \"Liquour Jugs\"\n\n  header <- oNew title\n  oModify header $\n    oTopY .~ screenTop\n  oShow header\n\n  l1 <- oNew line1\n  l1 `oBelow` header\n  oShow l1\n\n  l2 <- oNew line2\n  l2 `oBelow` l1\n  oShow l2\n\n  l3 <- oNew line3\n  l3 `oBelow` l2\n  oShow l3\n  wait 1\n\noBelow a b = do\n  aBot <- oRead b oBottomY\n  oModifyS a $ do\n    oMarginTop .= 0\n    oTopY .= aBot\n\nenv =\n  addStatic (mkBackground \"white\") .\n  mapA (withStrokeWidth 0)\n\n"}
  ];
const playgroundVersion = "2021-01-14 (4e79d)";
