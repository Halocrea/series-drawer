/* eslint-disable */
document.addEventListener('DOMContentLoaded', (e) => {
    console.log(`%c                                .:;;;;:,'                                      
                         ,@@@@@@@@@@@@@@@@@@@@@@:                              
                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@#                          
                      ;@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                       
                   :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@;                    
                 @@@@@@@@@@@@@@#';:::;'#@@@@@@@@@@@@@@@@@@@@;                  
               @@@@@@@@@:                     ,@@@@@@@@@@@@@@@                 
             ,@@@@@@'                             :@@@@@@@@@@@@+               
            @@@@@@           @@@@@@@@@@@@@@          @@@@@@@@@@@@              
           @@@@@          ;'@@@@@@@@@@@@@@@@@@@        @@@@@@@@@@@             
          @@@@'           +@@@@@@@@@@@@@@@@@.           '@@@@@@@@@@            
         @@@@             +@           +@@@               @@@@@@@@@'           
        @@@@              #'          #@@@                 @@@@@@@@@           
        @@@:                         #@@@                  ,@@@@@@@@@          
   ::::@@@@                         #@@@@+:                 @@@@@@@@@          
   @@@@@@@                         @@@@@@@@@@@              @@@@@@@@@@         
   ;@@@@@@                                @@@@@@            ,@@@@@@@@@@@@@@@   
    @@@@@@                                  @@@@@           :@@@@@@@@@@#####   
                                             @@@@+          @@@@@@@@@#         
                     @                       @@@@@          @@@@@@@@@          
                    @@@                      @@@@@         '@@@@@@@@@          
                     @@@@'                  @@@@@'         @@@@@@@@@           
                      '@@@@@              #@@@@@@         @@@@@@@@@@           
                        +@@@@@@@',.'.:#@@@@@@@@@        .@@@@@@@@@@            
                          .@@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@             
                           '@@@@@@@@@@@@@@@.         #@@@@@@@@@@@              
                                .:'';:'            @@@@@@@@@@@@@               
                    @@@                         #@@@@@@@@@@@@@#                
                   @@@@@@@'                 '@@@@@@@@@@@@@@@@                  
                    ;@@@@@@@@@@@@@@##@@@@@@@@@@@@@@@@@@@@@@                    
                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                      
                          +@@@@@@@@@@@@@@@@@@@@@@@@@@@                         
                               :+@@@@@@@@@@@@@@@@+                             
                                 @@@@@@@@@+:`, 'color: #2a95da')
})
// kappa EE
let current = 0
const objective = ['L', 'E', 'T', 'H', 'A', 'L']
document.addEventListener('keydown', (e) => {
    if (e.key.toUpperCase() === objective[current])
        current++
    else
        current = 0

    if (current >= objective.length) {
        const css = document.createElement('style')
        css.type = 'text/css'
        let styles = '.kappa-ee { position: fixed; z-index: 9999; top: 100%; left: 50%; width: 52.4rem; height: 52.4rem; transform: translate3d(-50%, 0, 0); animation: hopla .8s forwards ease-in-out; animation-delay: .5s; }'
        styles += ' @keyframes hopla { 0%, 100% { top: 100%; } 50% { top: 50%; } }'

        if (css.styleSheet)
            css.styleSheet.cssText = styles
        else
            css.appendChild(document.createTextNode(styles))

        document.getElementsByTagName("head")[0].appendChild(css)

        const img = new Image()
        img.src = '/other/ee/kappa-ee.png'
        img.classList.add('kappa-ee')

        const audio = new Audio('/other/ee/kappa-ee.mp3')
        audio.onended = () => setTimeout(() => document.body.removeChild(img), 500)
        document.body.appendChild(img)
        audio.addEventListener('canplaythrough', () => {
            audio.play()
        })
        current = 0
    }
})